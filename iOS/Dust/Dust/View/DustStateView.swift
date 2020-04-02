import UIKit

class DustStateView: UIView {

    @IBOutlet weak var backgroundView: UIView!
    @IBOutlet weak var stateSymbol: UILabel!
    @IBOutlet weak var stateText: UILabel!
    @IBOutlet weak var dustValue: UILabel!
    @IBOutlet weak var dateTimeLabel: UILabel!

    func setData(dataSource dustState: DustState) {
        guard let grade = GradeFactory.create(by: dustState.originalGrade) else { return }

        stateSymbol.text = grade.symbol
        stateText.text = grade.label
        self.backgroundView.backgroundColor = grade.color
        dustValue.text = "\(dustState.value ?? 0) µg/m³"
        dateTimeLabel.text = dateFormat(for: dustState.measuredTime)
    }

    private func dateFormat(for dateTime: Date) -> String {
        let dateFormatter = DateFormatter.relativeDate

        return dateFormatter.string(from: dateTime)
    }

    func makeGradientLayer(in view: UIView, startColor: CGColor) {
        let gradientLayer = CAGradientLayer()
        gradientLayer.frame = view.bounds
        gradientLayer.startPoint = CGPoint(x: 0.5, y: 0)
        gradientLayer.endPoint = CGPoint(x: 0.5, y: 1)
        gradientLayer.colors = [ startColor, UIColor.white.cgColor ]
        gradientLayer.shouldRasterize = true
        view.layer.addSublayer(gradientLayer)
    }
}
