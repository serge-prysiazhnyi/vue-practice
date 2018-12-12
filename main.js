var app=new Vue({
  el: '.container',
  data:{
    list:[
      {height:300,color:ChangeColor(), status: null},
      {height:300,color:ChangeColor(), status: null},
      {height:300,color:ChangeColor(), status: null},
      {height:300,color:ChangeColor(), status: null},
      {height:300,color:ChangeColor(), status: null},
      {height:300,color:ChangeColor(), status: null},
      {height:300,color:ChangeColor(), status: null}],
  },
  created() {
    let localData = localStorage['mixing'] ? JSON.parse(localStorage['mixing']) : {};
    for(let key in localData){
      if (isNaN(+localData[key])){
        this.list[key].status = localData[key];
        continue;
      }
      this.list[key].height = +localData[key];
    }
  },
  methods: {
    compare(a, b){
      if (a.height < b.height)
        return -1;
      if (a.height > b.height)
        return 1;
      return 0;
    },
    onChange (index, value){
      let localData = localStorage['mixing'] ? JSON.parse(localStorage['mixing']) : {};
      localData[index] = value;
      localStorage['mixing'] = JSON.stringify(localData);
    },
    onFilter () {
      this.list.sort(this.compare);
    },
    merge(index, value){
      let neVal = +this.list[index - 1].height + +value;
      if(neVal > 300){
        neVal = 300;
      }
      this.list[index - 1].height =  neVal;
      this.list[index].status = 'removed';
      this.onChange(index - 1, neVal);
      this.onChange(index, 'removed');
    }
  }
});
function getRand(min, max){
  return  Math.floor(Math.random()*(max - min) + min);
}
function ChangeColor(evnt){
  return 'rgb('+ getRand(0, 256) +', ' + getRand(0, 256) +', ' + getRand(0, 256) + ')';
}
// Drag and Drop
let items = document.querySelectorAll('.drag-item');
[].forEach.call(items, function(item){
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener('dragenter', handleDragEnter);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
});
let dragSrcEl = null;
function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
};
function handleDragOver(e) {
    if(e.preventDefault){
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
};
function handleDragEnter(e) {
    this.classList.add('over');
};
function handleDragLeave(e) {
    this.classList.remove('over');
};
function handleDrop(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    if (dragSrcEl != this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    this.classList.remove('over');
    return false;
}
function handleDragEnd(e) {
    [].forEach.call(items, function (item) {
      item.classList.remove('over');
    });
}