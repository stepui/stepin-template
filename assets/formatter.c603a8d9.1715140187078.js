function l(s,o=0){const i=s.toFixed(o).split(".");let[n,t]=i;t=parseInt(t)===0?void 0:t;let r=[];for(let e=n.length;e>=0;e-=3)r.push(n.substring(e-3<0?0:e-3,e));return r.reverse().join(",")+((t&&`.${t}`)??"")}export{l as f};
//# sourceMappingURL=formatter.c603a8d9.1715140187078.js.map
