
/**
 * todo:
 *  - Subsytems
 *  - Transcriptomics experiment list
 *  - Transcriptomics sample list
 */


const genomes = [
  'Escherichia coli SCD1',
  'Mycobacterium tuberculosis strain I0005443-2',
  'Pseudomonas aeruginosa strain KCJK8015',
  'Listeria monocytogenes strain LM15',
  'Burkholderia thailandensis E254',
  'brucella'
]

const genes = [
  {q: encodeURI('fig|2152888.3.peg.412')},
  {q: encodeURI('fig|1211817.3.peg.17')},
  {q: encodeURI('fig|29459.472.peg.2218')},
  {q: 'Transporter, LysE family'},
  {q: 'SOD1'},
  {q: 'P53', match: 'Clostridium difficile P53'}
]

const taxonomyViews = [
  {view: '/view/Taxonomy/1301#view_tab=taxontree', match: 'Streptococcus sinensis'},
  {view: '/view/Taxonomy/773#view_tab=taxontree', match: 'Bartonella sp. JB15'},
  {view: '/view/Taxonomy/469#view_tab=taxontree', match: 'Acinetobacter courvalinii'},
  {view: '/view/Taxonomy/776#view_tab=taxontree', match: 'Coxiella sp. DG_40'},
  {view: '/view/Taxonomy/662#view_tab=taxontree', match: 'Vibrio cyclitrophicus'},
  {view: '/view/Taxonomy/1637#view_tab=genomes', match: 'Listeria monocytogenes strain CFSAN044731'}
]

// mix of genius and genome level
const genomeOverviews = [
  {view: '/view/Taxonomy/810#view_tab=overview', match: 'Chlamydophila caviae GPIC'},
  {view: '/view/Taxonomy/1763#view_tab=overview', match: 'Mycobacterium'},
  {view: '/view/Genome/1105112.3', match: 'Rickettsia massiliae str. AZT80'},
  {view: '/view/Genome/1105112.3', match: 'Proteobacteria'},
  {view: '/view/Genome/300267.34', match: 'Shigella dysenteriae Sd197'},
  {view: '/view/Genome/9031.4', match: 'Gallus gallus'}
]

const genomeLists = [
  {view: '/view/Taxonomy/810#view_tab=genomes', match: '1 - 200'},
  {view: '/view/Taxonomy/1763#view_tab=genomes', match: '1 - 200'},
  {view: '/view/Taxonomy/1239#view_tab=genomes', match: '1 - 200'},
  {view: '/view/Taxonomy/356#view_tab=genomes', match: '1 - 200'},
  {view: '/view/Taxonomy/1236#view_tab=genomes', match: '1 - 200'},
  {view: '/view/Taxonomy/773#view_tab=genome', match: '1 - 200'},
]


const featureOverviews = [
  {
    view: '/view/Feature/PATRIC.269484.6.NC_007354.CDS.13333.14514.rev#view_tab=overview',
    match: 'Phage portal protein'
  }, {
    view: '/view/Feature/PATRIC.1121102.3.ARGD01000005.CDS.482.1375.rev#view_tab=overview',
    match: 'hypothetical protein'
  }, {
    view: '/view/Feature/PATRIC.2152888.3.QPER01000001.CDS.837321.837686.rev#view_tab=overview',
    match: 'hypothetical protein'
  }, {
    view: '/view/Feature/PATRIC.382638.14.NC_008229.CDS.12025.13122.fwd#view_tab=overview',
    match: 'ECO57IR fragment 1'
  }, {
    view: '/view/Feature/PATRIC.502347.3.NZ_CH991859.CDS.12924.13769.rev#view_tab=overview',
    match: 'fig|502347.3.peg.21'
  }, {
    view: '/view/Feature/PATRIC.208435.3.NC_004116.CDS.423717.424493.rev#view_tab=overview',
    match: 'Regulatory protein RecX'
  }
]


// mix of higher taxon level lists and genus level
const featureLists = [
  { // corresponds to first feature overview
    view: '/view/Taxonomy/943#view_tab=features',
    match: '1 - 200'
  }, { // corresponds to second overview
    view: '/view/Taxonomy/194#view_tab=features',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/28211#view_tab=features',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/234#view_tab=features',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/543#view_tab=features',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/561#view_tab=features',
    match: '1 - 200'
  }
]

const sequenceLists = [
  {view: '/view/Taxonomy/773#view_tab=sequences', match: '1 - 200'},
  {view: '/view/Taxonomy/32008#view_tab=sequences', match: '1 - 200'},
  {view: '/view/Taxonomy/1760#view_tab=sequences', match: '1 - 200'},
  {view: '/view/Taxonomy/2#view_tab=sequences', match: '1 - 200'},
  {view: '/view/Taxonomy/91347#view_tab=sequences', match: '1 - 200'},
  {view: '/view/Taxonomy/135623#view_tab=sequences', match: '1 - 200'},
]


const spGeneLists = [
  {
    view: '/view/Taxonomy/620#view_tab=specialtyGenes',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/91347#view_tab=specialtyGenes',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/561#view_tab=specialtyGenes',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/194#view_tab=specialtyGenes&filter=eq(antibiotics_class,"fusidic%20acid")',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/72293#view_tab=specialtyGenes',
    match: '1 - 200'
  }, {
    view: '/view/Taxonomy/286#view_tab=specialtyGenes&filter=or(eq(property,"Transporter"),eq(property,"Virulence%20Factor"))',
    match: '1 - 200'
  }
]

// note for genome browser views, the matches here are not ideal tests
// [the genome browser is canvas based as well]
const params = '&tracks=refseqs%2CPATRICGenes%2CRefSeqGenes&highlight='
const gBrowserViews = [
  {
    view: `/view/Genome/696125.3#view_tab=browser&loc=NC_014932%3A1..97946${params}`,
    match: 'Bartonella clarridgeiae 73'
  }, {
    view: `/view/Genome/1269334.5#view_tab=browser&loc=CBUA010000001%3A1..8675${params}`,
    match: 'Rickettsia monacensis IrR/Munich'
  }, {
    view: `/view/Genome/1042124.8#view_tab=browser&loc=JF767210%3A1..39594${params}`,
    match: 'Clostridium phage phiCP9O'
  }, {
    view: `/view/Genome/1227455.4#view_tab=browser&loc=AOMD01000016%3A16261..146131${params}`,
    match: 'Halococcus saccharolyticus DSM 5350'
  }, {
    view: '/view/Genome/1227455.4#view_tab=browser&loc=AOMD01000030%3A41223..370110',
    match: 'Halococcus saccharolyticus DSM 5350'
  }, {
    view: '/view/Genome/622.102#view_tab=browser&loc=622.102.con.0001%3A1..50078',
    match: 'Shigella dysenteriae strain M430'
  }
]

// note for circular views, the matches here are not ideal tests
const circularViews = [
  {
    view: '/view/Genome/1337385.3#view_tab=circular',
    match: 'Escherichia coli SCD2'
  }, {
    view: '/view/Genome/1909671.4#view_tab=circular',
    match: 'Genome View'
  }, {
    view: '/view/Genome/67300.3#view_tab=circular',
    match: 'Streptomyces flocculus strain NRRL B-2465'
  }, {
    view: '/view/Genome/992018.3#view_tab=circular',
    match: 'Helicobacter pylori CPY6081'
  }, {
    view: '/view/Genome/332415.4#view_tab=circular',
    match: 'Ehrlichia chaffeensis str. Sapulpa'
  }, {
    view: '/view/Genome/1388463.3#view_tab=circular',
    match: 'Staphylococcus aureus M0691'
  }
]

const pathways = [
  {
    view: '/view/Genome/1388463.3#view_tab=pathways',
    match: '1 - 127'
  }, {
    view: '/view/Genome/2044588.3#view_tab=pathways',
    match: '1 - 112'
  }, {
    view: '/view/Genome/317.197#view_tab=pathways',
    match: '1 - 139'
  }, {
    view: '/view/Genome/28901.2931#view_tab=pathways',
    match: '1 - 130'
  }, {
    view: '/view/Genome/1412457.3#view_tab=pathways',
    match: '1 - 135'
  }, {
    view: '/view/Genome/1841859.4#view_tab=pathways',
    match: '1 - 137'
  }
]

const subsystems = [
  {
    view: '___',
    match: '___'
  }, {
    view: '___',
    match: '___'
  }, {
    view: '___',
    match: '___'
  }, {
    view: '___',
    match: '___'
  }, {
    view: '___',
    match: '___'
  }, {
    view: '___',
    match: '___'
  }
]

module.exports = {
  genomes,
  genes,
  taxonomyViews,
  genomeOverviews,
  genomeLists,
  featureOverviews,
  featureLists,
  sequenceLists,
  spGeneLists,
  gBrowserViews,
  circularViews,
  pathways
}