import Foundation

struct DustStates: Codable {
    var list: [DustState]
}

struct DustState: Codable {
    enum CodingKeys: String, CodingKey {
        case measuredTime = "dataTime"
        case value = "pm10Value"
        case originalGrade = "pm10Grade1h"
    }

    let measuredTime: Date
    let value: Int
    let originalGrade: Int
    // let stationName: String

    var grade: Grade {
        GradeFactory.create(by: self.originalGrade)
    }
}

extension DustState {
    // TODO: 오류 처리
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        self.measuredTime = try container.decode(Date.self, forKey: .measuredTime)
        let value = try container.decode(String.self, forKey: .value)
        self.value = Int(value) ?? 0
        let originalGrade = try container.decode(String.self, forKey: .originalGrade)
        self.originalGrade = Int(originalGrade) ?? 0
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

        static func create(by rawValue: Int?) -> Grade {
            guard let value = rawValue, let kind = Grade.Kind(rawValue: value) else {
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
