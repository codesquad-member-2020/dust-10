import Foundation

struct HTTPRequest {
    enum APIError: Error {
        case request
        case data
        case decodingJSON
    }

    func getJSON<T: Decodable>(url: URL, decoder: JSONDecoder = JSONDecoder(), completion: @escaping (Result<T, APIError>) -> Void) {
        URLSession.shared.dataTask(with: url) { (data, response, error) in
            if error != nil {
                return completion(.failure(.request))
            }

            guard let data = data else {
                return completion(.failure(.data))
            }

            guard let model = try? decoder.decode(T.self, from: data) else {
                return completion(.failure(.decodingJSON))
            }

            completion(.success(model))
        }.resume()
    }
}


