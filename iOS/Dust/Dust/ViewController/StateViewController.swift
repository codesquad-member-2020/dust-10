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
        let urlAddress = "http://13.125.3.28:8080/api/dust-status?stationName=종로구"
        guard let encoded = urlAddress.addingPercentEncoding(withAllowedCharacters: .urlFragmentAllowed), let url = URL(string: encoded) else {
            print("잘못된 URL 주소입니다: \(urlAddress)"); return
        }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .formatted(DateFormatter.yyyyMMdd)

        request.getJSON(url: url, decoder: decoder) { (result: Result<DustStates, HTTPRequest.APIError>) in
            var dustState: DustState
            switch result {
            case .success(let dustStates):
                self.tableViewDataSource.updateData(dustStates.objects)
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
                dustState = dustStates.objects.first!
            case .failure(let error):
                print(error.localizedDescription)
                #warning("테스트 데이터")
                dustState = DustState(measuredTime: Date(), value: 314, originalGrade: 2)
            }
            self.updateMainView(dataSource: dustState)
        }
    }
}

