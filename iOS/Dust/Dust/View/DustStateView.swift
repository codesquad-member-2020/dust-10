import UIKit

class DustStateView: UIView {

    @IBOutlet weak var backgroundView: UIView!
    @IBOutlet weak var stateSymbol: UILabel!
    @IBOutlet weak var stateText: UILabel!
    @IBOutlet weak var dustValue: UILabel!
    @IBOutlet weak var dateTimeLabel: UILabel!

    func setData(dataSource dustState: DustState) {
        guard let grade = GradeFactory.create(by: dustState.originalGrade) else { return }

        stateSymbol.text = grade.symbol
        stateText.text = grade.label
        self.backgroundView.backgroundColor = grade.color
        dustValue.text = "\(dustState.value ?? 0) µg/m³"
        dateTimeLabel.text = dateFormat(for: dustState.measuredTime)
    }

    private func dateFormat(for dateTime: Date) -> String {
        let dateFormatter = DateFormatter.relativeDate

        return dateFormatter.string(from: dateTime)
    }
}

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

extension DateFormatter {
    static let yyyyMMdd: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm"
        formatter.calendar = Calendar(identifier: .iso8601)
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        formatter.locale = Locale(identifier: "ko_kr")

        return formatter
    }()

    static let relativeDate: DateFormatter = {
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .iso8601)
        formatter.timeZone = TimeZone(secondsFromGMT: 9 * 3600)
        formatter.locale = Locale(identifier: "ko_kr")
        formatter.doesRelativeDateFormatting = true
        formatter.dateStyle = .short
        formatter.timeStyle = .short

        return formatter
    }()
}
