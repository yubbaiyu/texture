export default [
  {
    id: 't1',
    title: 'Fix broken links',
    items: [
      { id: 'i1', description: 'Should link to Figure 2+3', done: false, resources: ['xref-79'] },
      { id: 'i2', description: 'Should link to Figure 1-3', done: false, resources: ['xref-99'] },
    ]
  },
  {
    id: 't2',
    title: 'Insert correct media',
    resources: ['media1', 'media3']
  },
  {
    id: 't3',
    title: 'Fix References',
    items: [
      { id: 'i1', description: 'Lookup DOI', done: false, resources: ['bib4'] },
      { id: 'i2', description: 'Fix reference', done: false, resources: ['bib23'] },
    ],
  },
]
