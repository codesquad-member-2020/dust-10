import Foundation

/// 미세 먼지 현황 데이터
struct DustStates: Codable {
    var objects: [DustState]
}

struct DustState: Codable {
    enum CodingKeys: String, CodingKey {
        case measuredTime = "dataTime"
        case value = "pm10Value"
        case originalGrade = "pm10Grade1h"
    }

    let measuredTime: Date
    let value: Int?
    let originalGrade: Int?
    var station: Station?
}

extension DustState {
    // TODO: 오류 처리
    /// 디코딩 사용자 정의
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        self.measuredTime = try container.decode(Date.self, forKey: .measuredTime)
        let value = try container.decode(String.self, forKey: .value)
        self.value = Int(value)
        let originalGrade = try container.decode(String.self, forKey: .originalGrade)
        self.originalGrade = Int(originalGrade)
    }
}

