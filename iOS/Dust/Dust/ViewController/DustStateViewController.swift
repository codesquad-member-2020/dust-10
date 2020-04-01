import UIKit

class DustStateViewController: UIViewController {
    @IBOutlet weak var barChartTableView: UITableView!
    let cellIdentifier: String = "BarCell"

    override func viewDidLoad() {
        super.viewDidLoad()

        barChartTableView.dataSource = self

        #warning("테스트 데이터")
        let dustState = DustState(dateTime: Date(), value: 3.14, pm10Grade1h: 2)

        if let view = self.view as? DustStateView {
            view.setData(dataSource: dustState)
        }
    }
}

extension DustStateViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 10
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = barChartTableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath)

        cell.detailTextLabel?.text = "200"

        return cell
    }
}
