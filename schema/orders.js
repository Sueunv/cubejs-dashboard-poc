
cube(`Orders`, {
  sql: `SELECT * FROM orders`,

  measures: {
    count: {
      type: 'count',
      drillMembers: [id, createdAt]
    },
    totalAmount: {
      sql: 'amount',
      type: 'sum'
    }
  },

  dimensions: {
    id: {
      sql: 'id',
      type: 'number',
      primaryKey: true
    },
    status: {
      sql: 'status',
      type: 'string'
    },
    createdAt: {
      sql: 'created_at',
      type: 'time'
    }
  }
});
