import UIKit

class StateViewController: UIViewController {

    // MARK: Properties

    @IBOutlet weak var tableView: UITableView!
    var tableViewDataSource: ChartTableViewDataSource!

    override func viewDidLoad() {
        super.viewDidLoad()

        tableViewDataSource = ChartTableViewDataSource()
        tableView.dataSource = tableViewDataSource

        // MARK: HTTPRequest JSON
        fetchStates()
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }

    // MARK: Private Methods

    private func updateMainView(dataSource: DustState) {
        DispatchQueue.main.async {
            if let view = self.view as? DustStateView {
                view.setData(dataSource: dataSource)
            }
        }
    }

    private func fetchStates() {
        let request = HTTPRequest()
        guard let url = URL(string: "https://dust10.herokuapp.com/api/dust-status") else { return }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .formatted(DateFormatter.yyyyMMdd)

        request.getJSON(url: url, decoder: decoder) { (result: Result<DustStates, HTTPRequest.APIError>) in
            var dustState: DustState
            switch result {
            case .success(let dustStates):
                self.tableViewDataSource.updateData(dustStates.list)
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
                dustState = dustStates.list.first!
            case .failure(let error):
                print(error.localizedDescription)
                #warning("테스트 데이터")
                dustState = DustState(measuredTime: Date(), value: 314, originalGrade: 2)
            }
            self.updateMainView(dataSource: dustState)
        }
    }
}

