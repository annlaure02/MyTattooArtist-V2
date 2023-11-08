import listDepartmentsRegions from '../list-departements-regions.json';

export const departmentsSorted = listDepartmentsRegions.sort((a, b) => a.dep_name.localeCompare(b.dep_name));

export const regionsSorted = ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Bretagne", "Centre-Val de Loire",
  "Corse", "Grand Est", "Guadeloupe", "Guyane", "Hauts-de-France", "Ile-de-France",
  "La Réunion", "Martinique", "Mayotte", "Normandie", "Occitanie", "Pays de la Loire",
  "Provence-Alpes-Côte d'Azur"];

/* 
export const regionsSorted = () => {
  const uniqueRegionsSet = new Set(listDepartmentsRegions.map(region => region.region_name));
  const uniqueRegionArray = Array.from(uniqueRegionsSet)
  const regions = uniqueRegionArray.sort()
  return regions
}
 */
