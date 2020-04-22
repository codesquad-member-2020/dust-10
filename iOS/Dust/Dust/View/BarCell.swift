import UIKit

/// 미세먼지 현황 탭 테이블 뷰의 Cell
class BarCell: UITableViewCell {
    @IBOutlet weak var dustBar: UIView!
    @IBOutlet weak var dustValue: UILabel!
    @IBOutlet weak var dustBarWidthConstraint: NSLayoutConstraint!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

    override func prepareForReuse() {
        super.prepareForReuse()

        self.dustBarWidthConstraint.isActive = false
        self.dustBar.backgroundColor = .none
    }

    func specifyProperties(with data: DustState) {
        self.dustValue.text = String(data.value ?? 0)

        let multiplier: CGFloat = min(1.0, CGFloat(data.value ?? 0) / 200.0)
        self.dustBarWidthConstraint = self.dustBar.widthAnchor.constraint(equalTo: self.contentView.widthAnchor, multiplier: multiplier)
        self.dustBarWidthConstraint.isActive = true

        if let grade = GradeFactory.create(by: data.originalGrade) {
            self.dustBar.backgroundColor = grade.color
        }
    }
}
