module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
};
```

---

## **5. .gitignore** (add these lines to your existing .gitignore)
```.DS_Store;
node_modules;
dist;
