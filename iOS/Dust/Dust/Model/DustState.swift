//

import Foundation

struct DustState: Codable {
//    private let dateFormat = "yyyy-MM-dd HH:mm"
    var dateTime: Date
    var value: Float
    var pm10Grade1h: Int
    // let stationName: String

    enum CodingKeys: String, CodingKey {
        case dateTime
        case value = "pm10Value"
        case pm10Grade1h
    }

    var grade: Grade {
        GradeFactory.create(by: self.pm10Grade1h)
    }
}

extension DustState {
    struct Grade {
        enum Kind: Int {
            case good = 1, normal, bad, veryBad
        }

        let kind: Kind
        let label: String
        let symbol: String
    }

    struct GradeFactory {
        static let config: Dictionary<Grade.Kind, (label: String, symbol: String)> = [
            .good: ("좋음", "😀"),
            .normal: ("보통", "🙂"),
            .bad: ("나쁨", "😷"),
            .veryBad: ("매우 나쁨", "😱")
        ]

        static func create(by rawValue: Int) -> Grade {
            guard let kind = Grade.Kind(rawValue: rawValue) else {
                preconditionFailure("잘못된 값입니다: \(rawValue)")
            }

            return self.create(by: kind)
        }

        static func create(by kind: Grade.Kind) -> Grade {
            guard let config = self.config[kind] else {
                preconditionFailure("잘못된 값입니다: \(kind)")
            }

            return Grade(kind: kind, label: config.label, symbol: config.symbol)
        }
    }
}
