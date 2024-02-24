until mongosh --host mongo:27017 --eval 'quit(db.runCommand({ ping: 1 }).ok ? 0 : 2)' &>/dev/null; do
  printf '.'
  sleep 1
done

cd /
echo '
try {
    var config = {
        "_id": "rs0", // TODO update this with your replica set name
        "version": 1,
        "members": [
        {
            "_id": 0,
            "host": "mongo:27017", // TODO rename this host
            "priority": 2
        },
        ]
    };
    rs.initiate(config, { force: true });
    rs.status();
    sleep(5000);

    admin = db.getSiblingDB("admin");
    admin.createUser(
          {
        user: "server",
        pwd:  "password", 
        roles: [ 
            { role: "readWrite", db: "appointment_db" },
            { role: "readWrite", db: "admin" } ,
        ]
          }
    );
    admin.auth("server", "password");
    db = db.getSiblingDB("appointment_db");
    db.createUser(
          {
        user: "server",
        pwd:  "password",
        roles: [ 
            { role: "readWrite", db: "appointment_db" },
            { role: "readWrite", db: "admin" } 
        ]
          });

    
} catch(e) {
    rs.status().ok
}
' > /config-replica.js



sleep 10
mongosh -u server -p "password" --authenticationDatabase admin --host mongo:27017 /config-replica.js