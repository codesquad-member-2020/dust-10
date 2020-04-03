import Foundation

/// HTTP로 JSON 요청을 담당
struct HTTPRequestJSON {
    enum APIError: Error {
        case request
        case data
        case decodingJSON
    }

    var url: URL
    var decoder = JSONDecoder()

    /// Result 타입을 사용해 서버 응답 결과 전달
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
    /// URL 문자열 검사 및 인코딩 처리
    init?(urlString: String, decoder: JSONDecoder = JSONDecoder()) {
        guard let encoded = urlString.addingPercentEncoding(withAllowedCharacters: .urlFragmentAllowed), let url = URL(string: encoded) else {
            print("잘못된 URL 주소입니다: \(urlString)")
            return nil
        }

        self.url = url
        self.decoder = decoder
    }
}

