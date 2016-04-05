

This node.js app is in a state where "cf push" can be performed and it can connect to a mysql database.

    $ git clone https://github.com/todd-hepler-ctl/hello.js.git
    $ cd hello.js
    $ cf login $YOUR_CF_ENDPOINT
    [...]
    $ cf push # push the app up for the first time
    [...]
    $ # now create a "service" for your database that is outside your cloud foundry cluster
    $ cf create-user-provided-service dbas-mysql-db -p "host, port, user, password, database"
    
    host> todd-mysql.uc1.rdbs.ctl.io
    
    port> 49247
    
    user> admin
    
    password> not-a-real-password
    
    database> foo
    Creating user provided service dbas-mysql-db in org DemoSE8 / space development as appsadmin...
    OK
    $ cf services # to see your newly created user provided service
    $ # bind the service to your hello.js app
    $ cf bind-service hello.js dbas-mysql-db
    Binding service dbas-mysql-db to app hello.js in org DemoSE8 / space development as appsadmin...
    OK
    TIP: Use 'cf restage hello.js' to ensure your env variable changes take effect
    $ cf restage hello.js
    
Inside server.js, the credentials that you specified for your dbas-mysql-db user provide service are parsed
from the VCAP_SERVICES environment variable and then used to connect to that database and retrieve a value.
    
