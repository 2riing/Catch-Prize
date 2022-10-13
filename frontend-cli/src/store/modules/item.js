
const item = {
  state: {
    filter: { type: '', options: {} },
    type: '',
    sender: '',
    recipent:  '',
    isItem: false,
  },
  mutation: {
    filter: state => state.filter,
    type: state => state.type,
    sender: state => state.sender,
    recipent: state => state.recipent,
    isitem: state => state.isitem
  },
  getters: {
    SET_FILTER: (state, filter) => state.filter = filter,
    SET_TYPE: (state, type) => state.type = type,
    SET_SENDER: (state, sender) => state.sender = sender,
    SET_RECIPENT: (state, recipent) => state.recipent = recipent,
  },
  actions: {
    applyFilter({ getters, commit }) {
      const filter = { type: '', options: {} }
      switch (getters.type) {
        // 회색화면
        case 'Grayscale':
          filter.type = 'GStreamerFilter';
          filter.options = { "command": "videobalance saturation=0.0" };
          break;
        // 뒤집기
        case 'Rotation':
          filter.type = 'GStreamerFilter';
          filter.options = { "command": "videoflip method=vertical-flip" };
          break;
        // 음성변조
        case 'Pitch':
          filter.type = 'GStreamerFilter';
          filter.options = { "command": "pitch pitch=20" };
          break;
        // 테두리
        case 'Videobox':
          filter.type = 'GStreamerFilter';
          filter.options = { "command": "videobox fill=black top=-30 bottom=-30 left=-30 right=-30" };
          break;
        // 화면 색 왜곡
        case 'Chroma':
          filter.type = 'GStreamerFilter';
          filter.options = { "command": 'chromahold target-r=0 target-g=0 target-b=255 tolerance=90' };
          break;
      }
      commit('SET_FILTER', filter)
    },
    sendFilter({ commit, getters }, recipent, type) {
      console.log('send Filter !')
      if ( getters.isitem === true ) { 
        console.log('item Active') 
        return;
      }
      commit('SET_TYPE', type)
      commit('SET_RECIPENT', recipent)
      recipent.stream.applyFilter(filter.type, filter.options)
      setTimeout(() => recipent.stream.removeFilter(), 20000)
    },
    // 턴이 끝났을 때, removeFilter 
    removeFilter(recipent) {
      recipent.stream.removeFilter()
    }
  }
}

export default item