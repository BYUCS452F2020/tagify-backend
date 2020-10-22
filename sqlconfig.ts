const sqlconfig = {
    userName: 'tagify',
    password: '7B_P3zMjrTJoPp_pr96M',
    server: 'cs452.database.windows.net',
    database: 'Tagify',
    encrypt: true,
    string: function() {
        return `Server=${this.server};Database=${this.database};User Id=${this.userName};Password=${this.password};encrypt=${this.encrypt}`
    }
}

export default sqlconfig;