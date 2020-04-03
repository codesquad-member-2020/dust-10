import UIKit

class StateViewController: UIViewController {

    // MARK: Properties

    @IBOutlet weak var tableView: UITableView!
    var tableViewDataSource: ChartTableViewDataSource!

    override func viewDidLoad() {
        super.viewDidLoad()

        tableViewDataSource = ChartTableViewDataSource()
        tableView.dataSource = tableViewDataSource
        tableView.delegate = self

        #warning("Core Location 구현")
        self.fetchNearStation(longitude: 126.9784147, latitude: 37.5666805)
    }

    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
    }

    // MARK: Private Methods

    private func updateMainView(with data: DustState?) {
        DispatchQueue.main.async {
            if let view = self.view as? DustStateView {
                view.setData(with: data)
            }
        }
    }

    // MARK: HTTPRequest JSON

    // TODO: 이름 바꿀 것
    private func fetchStates(station: Station) {
        let urlAddress = "http://13.125.3.28:8080/api/dust-status?stationName=\(station.name)"
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .formatted(DateFormatter.yyyyMMdd)

        let request = HTTPRequestJSON(urlString: urlAddress, decoder: decoder)
        request?.getJSON { (result: Result<DustStates, HTTPRequestJSON.APIError>) in
            var dustState: DustState?
            switch result {
            case .success(let dustStates):
                self.tableViewDataSource.updateData(dustStates.objects)
                DispatchQueue.main.async {
                    self.tableView.reloadData()
                }
                dustState = dustStates.objects.first
                dustState?.station = station
            case .failure(let error):
                print(error.localizedDescription)
            }
            //TODO: 데이터 불러오기 전에 뭘 보여줘야 할까.
            self.updateMainView(with: dustState)
        }
    }

    // TODO: 이름 바꿀 것
    private func fetchNearStation(longitude: Float, latitude: Float) {
        let urlAddress = "http://13.125.3.28:8080/api/location?longitude=\(longitude)&latitude=\(latitude)"
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .formatted(DateFormatter.yyyyMMdd)

        let request = HTTPRequestJSON(urlString: urlAddress, decoder: decoder)
        request?.getJSON { (result: Result<Station, HTTPRequestJSON.APIError>) in
            switch result {
            case .success(let response):
                print("success Fetch near station")
                self.fetchStates(station: response)
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }

}

extension StateViewController: UITableViewDelegate {
    //TODO: (선택)셀을 선택했을 때도 반영하도록 추가
    func tableView(_ tableView: UITableView, willDisplay cell: UITableViewCell, forRowAt indexPath: IndexPath) {
        updateMainViewWhenScrolling()
    }

    private func updateMainViewWhenScrolling() {
        if let indexPath: IndexPath = self.tableView.indexPathsForVisibleRows?.first {
            let dustState = self.tableViewDataSource.data(at: indexPath.row)
            self.updateMainView(with: dustState)
        }
    }
}
