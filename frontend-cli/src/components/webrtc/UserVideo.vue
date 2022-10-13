<template>
<div v-if="streamManager">
	<ov-video :stream-manager="streamManager"/>
	<!-- <div><p>{{ clientData }}</p></div>S -->
</div>
</template>

<script>
import OvVideo from './OvVideo.vue';
export default {

	components: {
		OvVideo,
	},

	props: {
		streamManager: Object,
	},

	// computed: {
	// 	clientData () {
	// 		const { clientData } = this.getConnectionData();
	// 		return clientData;
	// 	},
	// },

	// methods: {
	// 	getConnectionData () {
	// 		const { connection } = this.streamManager.stream;
	// 		return JSON.parse(connection.data);
	// 	},
	// },
};

</script>
