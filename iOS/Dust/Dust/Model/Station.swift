import Foundation

struct Station: Codable {
    var name: String

    enum CodingKeys: String, CodingKey {
        case name = "stationName"
    }
}
