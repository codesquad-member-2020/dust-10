import UIKit

/// 미세먼지 측정 데이터의 등급 표시 정보 관리
struct Grade {
    enum Kind: Int {
        case good = 1, normal, bad, veryBad
    }

    let kind: Kind
    let label: String
    let symbol: String
    let color: UIColor
}

struct GradeFactory {
    static let config: Dictionary<Grade.Kind, (label: String, symbol: String, color: UIColor)> = [
        .good: ("좋음", "😀", UIColor(hex: "#3D85DD")!),
        .normal: ("보통", "🙂", UIColor(hex: "#23BA46")!),
        .bad: ("나쁨", "😷", UIColor(hex: "#FF8900")!),
        .veryBad: ("매우 나쁨", "😱", UIColor(hex: "#C10404")!)
    ]

    static func create(by rawValue: Int?) -> Grade? {
        guard let value = rawValue, let kind = Grade.Kind(rawValue: value) else { return nil }

        return self.create(by: kind)
    }

    static func create(by kind: Grade.Kind) -> Grade {
        guard let config = self.config[kind] else {
            preconditionFailure("잘못된 값입니다: \(kind)")
        }

        return Grade(kind: kind, label: config.label, symbol: config.symbol, color: config.color)
    }
}

