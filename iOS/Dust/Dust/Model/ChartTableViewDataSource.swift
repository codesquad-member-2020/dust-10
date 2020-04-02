import UIKit

class ChartTableViewDataSource: NSObject, UITableViewDataSource {

    private var dustStates = [DustState]()
    private let cellIdentifier: String = "BarCell"

    // MARK: DataSource

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.dustStates.count
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! BarCell
        let dustState = self.dustStates[indexPath.row]

        //MARK: cell 속성 변경
        cell.dustValue.text = String(dustState.value ?? 0)

        let multiplier: CGFloat = min(1.0, CGFloat(dustState.value ?? 0) / 200.0)
        cell.dustBarWidthConstraint = cell.dustBar.widthAnchor.constraint(equalTo: cell.contentView.widthAnchor, multiplier: multiplier)
        cell.dustBarWidthConstraint.isActive = true

        if let grade = GradeFactory.create(by: dustState.originalGrade) {
            cell.dustBar.backgroundColor = grade.color
        }

        return cell
    }

    // MARK: Custom Methods

    func updateData(_ data: [DustState]) {
        self.dustStates = data
    }
}
