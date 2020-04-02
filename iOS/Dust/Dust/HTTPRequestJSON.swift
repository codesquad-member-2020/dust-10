import Foundation

struct HTTPRequestJSON {
    enum APIError: Error {
        case request
        case data
        case decodingJSON
    }

    var url: URL
    var decoder = JSONDecoder()

    func getJSON<T: Decodable>(completion: @escaping (Result<T, APIError>) -> Void) {
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            if error != nil {
                return completion(.failure(.request))
            }

            guard let data = data else {
                return completion(.failure(.data))
            }

            guard let model = try? self.decoder.decode(T.self, from: data) else {
                return completion(.failure(.decodingJSON))
            }

            completion(.success(model))
        }.resume()
    }
}

extension HTTPRequestJSON {
    init?(urlString: String, decoder: JSONDecoder = JSONDecoder()) {
        guard let encoded = urlString.addingPercentEncoding(withAllowedCharacters: .urlFragmentAllowed), let url = URL(string: encoded) else {
            print("잘못된 URL 주소입니다: \(urlString)")
            return nil
        }

        self.url = url
        self.decoder = decoder
    }
}

