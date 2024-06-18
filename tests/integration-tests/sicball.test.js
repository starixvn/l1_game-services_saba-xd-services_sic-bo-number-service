describe("SicBall integration tests", () => {
        // core-functionality tests
        require("./test-suites/core-functionality/check-connect.test");
        require("./test-suites/core-functionality/sign-in.test");
        require("./test-suites/core-functionality/unsettled-round.test");
        require("./test-suites/core-functionality/get-pf-info.test");
        require("./test-suites/core-functionality/place-bet.test");
        require("./test-suites/core-functionality/settle.test");

        // service validation tests
        require("./test-suites/service-validation/place-bet-validation.test");

        // rate limit test
        require("./test-suites/core-functionality/rate-limit.test");
});
