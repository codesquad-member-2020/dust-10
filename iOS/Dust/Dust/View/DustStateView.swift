import UIKit

/// 미세 먼지 현황 탭 상단을 담당하는 뷰
class DustStateView: UIView {

    @IBOutlet weak var backgroundView: UIView!
    @IBOutlet weak var stateSymbol: UILabel!
    @IBOutlet weak var stateText: UILabel!
    @IBOutlet weak var dustValue: UILabel!
    @IBOutlet weak var dateTimeLabel: UILabel!
    @IBOutlet weak var stationLabel: UILabel!

    func setData(with dustState: DustState?) {
        guard let dustState = dustState, let grade = GradeFactory.create(by: dustState.originalGrade) else { return }

        stateSymbol.text = grade.symbol
        stateText.text = grade.label
        dustValue.text = "\(dustState.value ?? 0) µg/m³"
        dateTimeLabel.text = dateFormat(for: dustState.measuredTime)
        if let name = dustState.station?.name {
            stationLabel.text = name
        }

        let gradientLayer = self.makeGradientLayer(startColor: grade.color.cgColor, in: backgroundView)
        self.backgroundView.layer.addSublayer(gradientLayer)
    }

    private func dateFormat(for dateTime: Date) -> String {
        let dateFormatter = DateFormatter.relativeDate

        return dateFormatter.string(from: dateTime)
    }

    private func makeGradientLayer(startColor: CGColor, in view: UIView) -> CAGradientLayer {
        let gradientLayer = CAGradientLayer()
        gradientLayer.frame = view.bounds
        gradientLayer.startPoint = CGPoint(x: 0.5, y: 0)
        gradientLayer.endPoint = CGPoint(x: 0.5, y: 1)
        gradientLayer.colors = [ startColor, UIColor.white.cgColor ]
        gradientLayer.shouldRasterize = true

        return gradientLayer
    }
}
