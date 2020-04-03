import UIKit

/// 미세먼지 현황 탭의 테이블 뷰의 DataSource
class ChartTableViewDataSource: NSObject, UITableViewDataSource {

    var dustStates = [DustState]()
    private let cellIdentifier: String = "BarCell"

    // MARK: DataSource

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.dustStates.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! BarCell
        let dustState = self.dustStates[indexPath.row]

        cell.specifyProperties(with: dustState)

        return cell
    }

    // MARK: Custom Methods

    func updateData(_ data: [DustState]) {
        self.dustStates = data
    }

    func data(at index: Int) -> DustState {
        return dustStates[index]
    }
}
