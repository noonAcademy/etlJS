module.exports = {
    etlDataConstant: {
        devLocal: 'etlData',
        devAws: 'etlData',
        qa: 'etlData',
        prod: 'etlData'
    },
    baseURL: {
        devLocal: 'http://127.0.0.1:3011/packages/v1',
        devAws: 'https://hyyhuwu318.execute-api.us-east-2.amazonaws.com/v1',
        qa: 'http://127.0.0.1:3011/packages/v1',
        prod: 'http://127.0.0.1:3011/packages/v1'
    },
    singleRecordUrl: {
        devLocal: '/etlRoute',
        devAws: '/event',
        qa: '/etlRouteqa',
        prod: '/etlRoute'
    },
    multipleRecordsUrl: {
        devLocal: '/etlRoutes',
        devAws: '/event',
        qa: '/etlRoutesqa',
        prod: '/etlRoutes'
    },
    defualtPartitionKey: {
        devLocal: 'test_pk',
        devAws: 'test_pk',
        qa: 'test_pk',
        prod: 'test_pk'
    }
}