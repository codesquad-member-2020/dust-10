import UIKit

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
}
