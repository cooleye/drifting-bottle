"use strict";

var BottleItem = function(text) {
	if (text) {
		var obj = JSON.parse(text);
		this.key = obj.key;
		this.value = obj.value;
		this.author = obj.author;
	} else {
	    this.key = "";
	    this.author = "";
	    this.value = "";
	}
};

BottleItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

var DriftingBottle = function () {
    LocalContractStorage.defineMapProperty(this, "repo", {
        parse: function (text) {
            return new BottleItem(text);
        },
        stringify: function (o) {
            return o.toString();
        }
    });
};

DriftingBottle.prototype = {
    init: function () {
        // todo
    },

    save: function (key, value) {

        key = key.trim();
        value = value.trim();
        if (key === "" || value === ""){
            throw new Error("empty key / value");
        }
        if (value.length > 64 || key.length > 64){
            throw new Error("key / value exceed limit length")
        }

        var from = Blockchain.transaction.from;
        var bottleItem = this.repo.get(key);
        if (BottleItem){
            throw new Error("value has been occupied");
        }

        bottleItem = new BottleItem();
        bottleItem.author = from;
        bottleItem.key = key;
        bottleItem.value = value;

        this.repo.put(key, bottleItem);
    },

    get: function (key) {
        key = key.trim();
        if ( key === "" ) {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    }
};
module.exports = DriftingBottle;