//  ########################## Car components
var CarList = Vue.extend({
    template: '<h2>Samochody</h2>\n\
    <a class="btn btn-primary" v-link="{ path: \'/carEdit\' }">Nowy rekord</a>\n\
    <hr />\n\
    <table class="table table-bordered">\n\
        <thead>\n\
            <th>Rejestracja</th>\n\
            <th>Model</th>\n\
            <th>Producent</th>\n\
            <th>Usuwanie</th>\n\
        </thead>\n\
        <tbody  v-for="item in Cars" track-by="id">\n\
            <tr><td>{{ item.name }}</td><td>{{ item.model.name }}</td><td>{{ item.model.producer.name }}</td>\n\
            <td>\n\
                <button class="btn btn-primary" v-on:click="removeCar(item.id)">Usuń</button>\n\
                <a class="btn btn-primary" v-link="{ path: \'/carEdit?id=\'+item.id }">Edycja</a>\n\
            </td></tr>\n\
        </tbody>\n\
    </table>\n\
',
    data: function () {
            return {Cars:null};
        },
    created: function(){
        var self = this;
        this.$http({url: 'web/get_all/Car', method: 'GET'}).then(function (response) {
                self.Cars = response.data.data;
            });
    },
    methods: {
        removeCar: function(id){
            this.$parent.removeElementById(id, this.Cars);
            this.$http({url: 'web/remove_element/Car/'+id, method: 'GET'}).then(function (response) {
                return;
            });
        }
    }
});

var CarEdit = Vue.extend({
    template: '<h2>Edycja / Tworzenie rekordu</h2>\n\
        <form>\n\
            <div class="form-group">\n\
                <label for="name">Rejestracja</label>\n\
                <input type="text" class="form-control" id="name" name="name" v-model="Car.name">\n\
            </div>\n\
            <div class="form-group">\n\
                <label for="name">Model</label>\n\
                <select class="form-control" v-model="Car.model.id">\n\
                    <option v-for="option in Models" v-bind:value="option.id">\n\
                        {{ option.producer.name }} {{ option.name }}\n\
                    </option>\n\
                </select>\n\
            </div>\n\
        </form>\n\
        <button v-on:click="saveCar()" class="btn btn-default">Zapisz</button>\n\
        <a class="btn btn-primary" v-link="{ path: \'/carList\' }">Powrót do listy</a>\n\
    ',
    data: function(){
        return {
            Car: {
                id: null,
                name: null,
                model: {
                    id: null,
                    name: null,
                },
            },
            Models: null
        }
    },
    created: function(){
            var self = this;
            
            this.$http({url: 'web/get_all/Model', method: 'GET'}).then(function (response) {
                self.Models = response.data.data;
                
                
                if(self.$route.query.id){
                    self.$http({url: 'web/get_element/Car/'+self.$route.query.id, method: 'GET'}).then(function (response) {
                        self.Car = response.data.data;
                    });
                }
                
            });
        },
    methods: {
        saveCar: function(){
            var self = this;
            this.$parent.sendAjax(self.Car, 'web/app_dev.php/save_element/Car', function(response){
                console.log(response);
                self.Car.id = response.data.id;
            });
            
        }
    }
});

//  ############################## Models components

var ModelList = Vue.extend({
    template: '<h2>Modele</h2>\n\
    <a class="btn btn-primary" v-link="{ path: \'/modelEdit\' }">Nowy rekord</a>\n\
    <hr />\n\
    <table class="table table-bordered">\n\
        <thead>\n\
            <th>Nazwa</th>\n\
            <th>Producent</th>\n\
            <th>Opcje</th>\n\
        </thead>\n\
        <tbody  v-for="item in Models" track-by="id">\n\
            <tr><td>{{ item.name }}</td><td>{{ item.producer.name }}</td>\n\
            <td>\n\
                <button class="btn btn-primary" v-on:click="removeModel(item.id)">Usuń</button>\n\
                <a class="btn btn-primary" v-link="{ path: \'/modelEdit?id=\'+item.id }">Edycja</a>\n\
            </td></tr>\n\
        </tbody>\n\
    </table>\n\
',
    data: function () {
            return {Models:null};
        },
    created: function(){
        var self = this;
        this.$http({url: 'web/get_all/Model', method: 'GET'}).then(function (response) {
                self.Models = response.data.data;
            });
    },
    methods: {
        removeModel: function(id){
            this.$parent.removeElementById(id, this.Models);
            this.$http({url: 'web/remove_element/Model/'+id, method: 'GET'}).then(function (response) {
                return;
            });
        }
    }
});


var ModelEdit = Vue.extend({
    template: '<h2>Edycja / Tworzenie rekordu</h2>\n\
        <form>\n\
            <div class="form-group">\n\
                <label for="name">Nazwa</label>\n\
                <input type="text" class="form-control" id="name" name="name" v-model="Model.name">\n\
            </div>\n\
            <div class="form-group">\n\
                <label for="name">Producent</label>\n\
                <select class="form-control" v-model="Model.producer.id">\n\
                    <option v-for="option in Producers" v-bind:value="option.id">\n\
                        {{ option.name }}\n\
                    </option>\n\
                </select>\n\
            </div>\n\
        </form>\n\
        <button v-on:click="saveModel()" class="btn btn-default">Zapisz</button>\n\
        <a class="btn btn-primary" v-link="{ path: \'/modelList\' }">Powrót do listy</a>\n\
    ',
    data: function(){
        return {
            Model: {
                id: null,
                name: null,
                producer: {
                    id: null,
                    name: null,
                },
            },
            Producers: null
        }
    },
    created: function(){
            var self = this;
            
            this.$http({url: 'web/get_all/Producer', method: 'GET'}).then(function (response) {
                self.Producers = response.data.data;
                
                
                if(self.$route.query.id){
                    self.$http({url: 'web/get_element/Model/'+self.$route.query.id, method: 'GET'}).then(function (response) {
                        self.Model = response.data.data;
                    });
                }
                
            });
        },
    methods: {
        saveModel: function(){
            var self = this;
            this.$parent.sendAjax(self.Model, 'web/app_dev.php/save_element/Model', function(response){
                console.log(response);
                self.Model.id = response.data.id;
            });
            
        }
    }
});

// ############################# Producer components
var ProducerList = Vue.extend({
    template: '<h2>Producenci</h2>\n\
    <a class="btn btn-primary" v-link="{ path: \'/producerEdit\' }">Nowy rekord</a>\n\
    <hr />\n\
    <table class="table table-bordered">\n\
        <thead>\n\
            <th>Nazwa</th>\n\
            <th>Opcje</th>\n\
        </thead>\n\
        <tbody  v-for="item in Producers" track-by="id">\n\
            <tr><td>{{ item.name }}</td>\n\
            <td>\n\
                <button class="btn btn-primary" v-on:click="removeProducer(item.id)">Usuń</button>\n\
                <a class="btn btn-primary" v-link="{ path: \'/producerEdit?id=\'+item.id }">Edycja</a>\n\
            </td></tr>\n\
        </tbody>\n\
    </table>\n\
',
    data: function () {
            return {Producers:null};
        },
    created: function(){
        var self = this;
        this.$http({url: 'web/get_all/Producer', method: 'GET'}).then(function (response) {
                self.Producers = response.data.data;
            });
    },
    methods: {
        removeProducer: function(id){
            this.$parent.removeElementById(id, this.Producers);
            this.$http({url: 'web/remove_element/Producer/'+id, method: 'GET'}).then(function (response) {
                return;
            });
        }
    }
});


var ProducerEdit = Vue.extend({
    template: '<h2>Edycja / Tworzenie rekordu</h2>\n\
        <form>\n\
            <div class="form-group">\n\
                <label for="name">Nazwa</label>\n\
                <input type="text" class="form-control" id="name" name="name" v-model="Producer.name">\n\
            </div>\n\
        </form>\n\
        <button v-on:click="saveProducer()" class="btn btn-default">Zapisz</button>\n\
        <a class="btn btn-primary" v-link="{ path: \'/producerList\' }">Powrót do listy</a>\n\
    ',
    data: function(){
        return {
            Producer: {
                id: null,
                name: null,
            },
        }
    },
    created: function(){
            var self = this;
            
            if(self.$route.query.id){
                self.$http({url: 'web/get_element/Producer/'+self.$route.query.id, method: 'GET'}).then(function (response) {
                    self.Producer = response.data.data;
                });
            }
        },
    methods: {
        saveProducer: function(){
            var self = this;
            this.$parent.sendAjax(self.Producer, 'web/app_dev.php/save_element/Producer', function(response){
                console.log(response);
                self.Producer.id = response.data.id;
            });
            
        }
    }
});

// MAIN APP INSTANCE
var App = Vue.extend({
    methods: {
        removeElementById: function(id, array){
            for(var i = 0; i < array.length; i++){
                if(array[i].id == id){
                    array.splice(i, 1);
                }
            }
        },
        sendAjax: function(data, url, callback){
            $.ajax({
                url: url,
                data: data,
                type: 'POST',
//                dataType: 'json',
                success: function(response) {
                    callback(response);
                }
          });
        }
    }
});

// ROUTER ITD.
var router = new VueRouter();
var vueResource = new VueResource();


router.map({
    '/carList': {
        component: CarList
    },
    '/carEdit': {
        component: CarEdit
    },
    '/modelList': {
        component: ModelList
    },
    '/modelEdit': {
        component: ModelEdit
    },
    '/producerList': {
        component: ProducerList
    },
    '/producerEdit': {
        component: ProducerEdit
    }
})


router.start(App, '#app');