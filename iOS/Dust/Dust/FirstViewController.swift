//

import UIKit

class FirstViewController: UIViewController {
    @IBOutlet weak var stateSymbol: UILabel!
    @IBOutlet weak var stateLabel: UILabel!
    @IBOutlet weak var dustValue: UILabel!
    @IBOutlet weak var dateTimeLabel: UILabel!

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        let dustState = DustState(dateTime: Date(), value: 3.14, pm10Grade1h: 1)

        stateSymbol.text = dustState.grade.symbol
        stateLabel.text = dustState.grade.label
        dustValue.text = "\(dustState.value) µg/m³"

        // dateformat
        let dateFormatter = DateFormatter()
        dateFormatter.doesRelativeDateFormatting = true
        dateFormatter.locale = Locale(identifier: "ko")
        dateFormatter.dateStyle = .long
        dateFormatter.timeStyle = .short

        dateTimeLabel.text = dateFormatter.string(from: dustState.dateTime)
    }
}

