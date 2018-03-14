module.exports = {
    etlDataConstant: {
        devLocal: 'etlData',
        devAws: 'etlData',
        qa: 'etlData',
        prod: 'etlData'
    },
    baseURL: {
        devLocal: 'http://127.0.0.1:3011/packages/v1',
        devAws: 'http://127.0.0.1:3011/packages/v1',
        qa: 'http://127.0.0.1:3011/packages/v1',
        prod: 'http://127.0.0.1:3011/packages/v1'
    },
    singleRecordUrl: {
        devLocal: '/etlRoute',
        devAws: '/etlRoute',
        qa: '/etlRouteqa',
        prod: '/etlRoute'
    },
    multipleRecordsUrl: {
        devLocal: '/etlRoutes',
        devAws: '/etlRoutes',
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