const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

// Test cases for the Pilates App API
const testCases = [
    {
        name: 'Health Check',
        method: 'GET',
        url: `${BASE_URL}/health`,
        expectedStatus: 200
    },
    {
        name: 'Get All Exercises (English)',
        method: 'GET',
        url: `${BASE_URL}/exercises?lang=en`,
        expectedStatus: 200
    },
    {
        name: 'Get All Exercises (Hebrew)',
        method: 'GET',
        url: `${BASE_URL}/exercises?lang=he`,
        expectedStatus: 200
    },
    {
        name: 'Get Specific Exercise - The Hundred',
        method: 'GET',
        url: `${BASE_URL}/exercises/ex_hundred?lang=en`,
        expectedStatus: 200
    },
    {
        name: 'Get Modifications - Hundred with Neck Injury',
        method: 'GET',
        url: `${BASE_URL}/modifications?exerciseId=ex_hundred&injuryId=neck_injury&lang=en`,
        expectedStatus: 200
    },
    {
        name: 'Get Modifications - Roll Up with Lower Back Injury',
        method: 'GET',
        url: `${BASE_URL}/modifications?exerciseId=ex_roll_up&injuryId=lower_back_injury&lang=en`,
        expectedStatus: 200
    },
    {
        name: 'Get Modifications - Alternative Route Format',
        method: 'GET',
        url: `${BASE_URL}/modifications/ex_hundred/neck_injury?lang=en`,
        expectedStatus: 200
    },
    {
        name: 'Test Error - Non-existent Exercise',
        method: 'GET',
        url: `${BASE_URL}/exercises/non_existent?lang=en`,
        expectedStatus: 404
    },
    {
        name: 'Test Error - Missing Parameters',
        method: 'GET',
        url: `${BASE_URL}/modifications?lang=en`,
        expectedStatus: 400
    }
];

async function runTests() {
    console.log('🧪 Starting API Tests...\n');

    let passed = 0;
    let failed = 0;

    for (const testCase of testCases) {
        try {
            console.log(`Testing: ${testCase.name}`);

            const response = await axios({
                method: testCase.method,
                url: testCase.url,
                timeout: 5000
            });

            if (response.status === testCase.expectedStatus) {
                console.log(`✅ PASSED - Status: ${response.status}`);
                passed++;
            } else {
                console.log(`❌ FAILED - Expected: ${testCase.expectedStatus}, Got: ${response.status}`);
                failed++;
            }
        } catch (error) {
            if (error.response && error.response.status === testCase.expectedStatus) {
                console.log(`✅ PASSED - Expected Error: ${error.response.status}`);
                passed++;
            } else {
                console.log(`❌ FAILED - ${error.message}`);
                failed++;
            }
        }
        console.log('');
    }

    console.log('📊 Test Results:');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { runTests, testCases };

