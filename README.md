

This node.js app is in a state where "cf push" can be performed and it can connect to a mysql database.

    $ git clone https://github.com/todd-hepler-ctl/hello.js.git
    $ cd hello.js
    $ cf login $YOUR_CF_ENDPOINT
    [...]
    $ cf create-user-provided-service dbas-mysql-db -p "host, port, user, password, database"
    
    host> todd-mysql.uc1.rdbs.ctl.io
    
    port> 49247
    
    user> admin
    
    password> not-a-real-password
    
    database> foo
    
