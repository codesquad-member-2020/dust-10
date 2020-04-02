import UIKit

class DustStateView: UIView {

    @IBOutlet weak var stateSymbol: UILabel!
    @IBOutlet weak var stateText: UILabel!
    @IBOutlet weak var dustValue: UILabel!
    @IBOutlet weak var dateTimeLabel: UILabel!

    func setData(dataSource dustState: DustState) {
        stateSymbol.text = dustState.grade.symbol
        stateText.text = dustState.grade.label
        dustValue.text = "\(dustState.value) µg/m³"
        dateTimeLabel.text = dateFormat(for: dustState.measuredTime)
    }

    private func dateFormat(for dateTime: Date) -> String {
        let dateFormatter = DateFormatter.relativeDate

        return dateFormatter.string(from: dateTime)
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
