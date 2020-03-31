import UIKit

class DustStateViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        #warning("테스트 데이터")
        let dustState = DustState(dateTime: Date(), value: 3.14, pm10Grade1h: 2)

        if let view = self.view as? DustStateView {
            view.setData(dataSource: dustState)
        }
    }
}
