import UIKit

class DustStateViewController: UIViewController {
    @IBOutlet weak var barChartTableView: UITableView!
    let cellIdentifier: String = "BarCell"

    override func viewDidLoad() {
        super.viewDidLoad()

        barChartTableView.dataSource = self

        // MARK: HTTPRequest JSON
        let request = HTTPRequest()
        guard let url = URL(string: "https://dust10.herokuapp.com/api/dust-status") else { return }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .formatted(DateFormatter.yyyyMMdd)
        request.getJSON(url: url, decoder: decoder) { (result: Result<DustStates, HTTPRequest.APIError>) in
            var dustState: DustState
            switch result {
            case .success(let dustStates):
                dustState = dustStates.list.first!
            case .failure(let error):
                print(error.localizedDescription)
                #warning("테스트 데이터")
                dustState = DustState(measuredTime: Date(), value: 314, originalGrade: 2)
            }
            self.updateMainView(dataSource: dustState)
        }
    }

    private func updateMainView(dataSource: DustState) {
        DispatchQueue.main.async {
            if let view = self.view as? DustStateView {
                view.setData(dataSource: dataSource)
            }
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
