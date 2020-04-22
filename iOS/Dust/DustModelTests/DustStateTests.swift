//

import XCTest
@testable import Dust

class DustStateTests: XCTestCase {
    var dustState: DustState!

    override func setUp() {
        self.dustState = DustState(dateTime: Date(), value: 6.5, pm10Grade1h: 1)
    }

    func testDustStateWhenGood() {
        dustState.pm10Grade1h = 1

        XCTAssertEqual("좋음", dustState.grade.label)
        XCTAssertEqual("😀", dustState.grade.symbol)
    }

    func testDustStateWhenNormal() {
        dustState.pm10Grade1h = 2

        XCTAssertEqual("보통", dustState.grade.label)
        XCTAssertEqual("🙂", dustState.grade.symbol)
    }

    func testDustStateWhenBad() {
        dustState.pm10Grade1h = 3

        XCTAssertEqual("나쁨", dustState.grade.label)
        XCTAssertEqual("😷", dustState.grade.symbol)
    }

    func testDustStateWhenVeryBad() {
        dustState.pm10Grade1h = 4

        XCTAssertEqual("매우 나쁨", dustState.grade.label)
        XCTAssertEqual("😱", dustState.grade.symbol)
    }

}
