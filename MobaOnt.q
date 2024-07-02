[QueryItem="champName"]

[QueryItem="ability"]
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
PREFIX vgo: <http://purl.org/net/videogameontology#>
PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?ability ?nome ?description
WHERE {
	?ability moba:abilityName ?nome . }