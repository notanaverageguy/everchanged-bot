const config = require("../misc/config.json");

function query(connection,  query, retries = 3, interval = 250) {
    return new Promise((resolve, reject) => {
      function attempt() {
        connection.query(query, (error, results) => {
          if (error) {
            if (retries === 0) {
              reject(error);
              return;
            }
            console.log(`Query failed, retrying in ${interval}ms...`);
            setTimeout(() => {
              retries--;
              attempt();
            }, interval);
          } else {
            resolve(results);
          }
        });
      }
      attempt();
    });
}


function update (interaction, connection, userID) {
    query(connection, `SELECT * FROM PEOPLE WHERE UUID="${userID}"`)
    .then((results) => {

        if(results.length > 0) {
            results = results[0];
            const rebirth = results.rebirth;
            const prestige = results.prestige;
            const multiplier = (prestige*0.1)*(rebirth+1)+(rebirth+1);

            var cps = results.cps;
            var lastupdated = results.lastupdated;
            var timePassed = Math.floor(Date.now() / 1000) - lastupdated;
            var earnedCredits = cps * timePassed * multiplier;
            var maxCredits = 200_000_000_000 * (prestige + 1);
            var credits = Math.floor(Math.min(earnedCredits + results.credits, maxCredits));

            query(connection, `UPDATE people SET credits = ${credits}, lastupdated = ${Math.floor(Date.now() / 1000)} WHERE UUID = ${userID}`).then((results) => {}).catch((error) => {console.log(error)});
        }

    }).catch((error) => {console.log(error)});

}

function createProfile (interaction, connection, user) {
    const userID = user.userID;
    query(connection, `SELECT * FROM PEOPLE WHERE UUID="${userID}"`)
    .then((results) => {
        if (error) throw error;
        results = results[0];

        if (error) throw error;
        if(!results) {

            query(connection, `INSERT INTO people VALUES(${userID},0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,${Date.now()/1000})`).then((results) => {}).catch((error) => {console.log(error)});
            interaction.reply({ content: `Started new character for ${user.username}`, ephemeral: true});
        }
    }).catch((error) => {console.log(error)});
}

function buyGen(interaction,connection, user, genInfo) {
    const userID = user.userID;

    const genPrice = genInfo.price;
    const genValue = genInfo.value;
    const genName = genInfo.name;

    update(interaction, connection, userID);

    setTimeout(() => {
        query(connection, `SELECT * FROM PEOPLE WHERE UUID="${userID}"`)
        .then((results) => {

            if(!results.length) {
                createProfile(interaction,connection,user);
                return;
            }
            results = results[0];
            var credits = results.credits
            var cps = results.cps;
    
    
            const alreadyOwned = results[genName];
            const canBuy = 100000 - alreadyOwned;
            const canPurchase = Math.floor( credits / genPrice);
            const purchased = Math.min(canPurchase, canBuy);
    
            if(canBuy <= 0) return interaction.reply({ content: `You can not buy any more (100000 gen limit)`, ephemeral: true });
            if(purchased <= 0) return interaction.reply({ content: `You can't afford this (${genPrice - credits} credits more needed)`, ephemeral: true });
    
            credits -= purchased * genPrice;
            cps += purchased * genValue;
            const newOwned = alreadyOwned + purchased;
    
            query(connection, `UPDATE people SET credits = ${credits}, cps = ${cps}, ${genName} = ${newOwned} WHERE UUID = ${userID}`).then((results) => {}).catch((error) => {console.log(error)});
            interaction.reply({ content: `Purchased ${purchased} ${genName} gens`, ephemeral: true });
            
        }).catch((error) => {console.log(error)});
    }, 100);
}


module.exports = { update, createProfile, buyGen, query};