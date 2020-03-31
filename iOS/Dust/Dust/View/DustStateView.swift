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
        dateTimeLabel.text = dateFormat(for: dustState.dateTime)
    }

    private func dateFormat(for dateTime: Date) -> String {
        // dateformat
        let dateFormatter = DateFormatter()
        dateFormatter.doesRelativeDateFormatting = true
        dateFormatter.locale = Locale(identifier: "ko")
        dateFormatter.dateStyle = .long
        dateFormatter.timeStyle = .short

        return dateFormatter.string(from: dateTime)
    }
}
