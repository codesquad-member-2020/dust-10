import Foundation

/// 측정소 정보
struct Station: Codable {
    var name: String

    enum CodingKeys: String, CodingKey {
        case name = "stationName"
    }
}
