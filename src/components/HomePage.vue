<template>
    <div class="exhibition-list">
        <div v-for="item in exhibitions" :key="item.id" class="exhibition-item" @click="this.toAR(item)">
        <div class="title">
            {{ item.name }}
        </div>
        <div class="author">
            {{ item.author }}
        </div>
     </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            exhibitions: []
        }
    },
    created() {
        fetch('http://localhost:9000/api/exhibitions')
            .then((res) => res.json())
            .then((data) => {
                this.exhibitions = data;
            });
    },
    methods: {
        toAR(item) {
            this.$router.push({name: 'ar', params: {id: item.id}})
        }
    }
}
</script>

<style scoped>
.exhibition-list {
    width: 300px;
    margin: 0 auto;
}

.exhibition-item {
    background-color: white;
    border-radius: 16px;
    padding: 10px;
    width: 250px;    
    margin-top: 20px;
}

.exhibition-item:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
}

.exhibition-item .title {
    text-transform: uppercase;
}
</style>