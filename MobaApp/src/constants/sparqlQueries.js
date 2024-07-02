export const FETCH_MENU_CHARACTERS_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>

    SELECT DISTINCT (STRAFTER(STR(?character), "#") AS ?Character)
    WHERE {
        ?character rdfs:subClassOf vgo:Character .
    }
    LIMIT 10
`;

export const FETCH_MENU_ITEMS_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>

    SELECT DISTINCT (STRAFTER(STR(?item), "#") AS ?Item)
    WHERE {
        ?item rdfs:subClassOf vgo:Item .
    }
    LIMIT 10
`;

export const FETCH_MENU_EVENTS_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>

    SELECT (STRAFTER(STR(?event), "#") AS ?Event)
        WHERE {
            ?event rdfs:subClassOf sport:Competition .
        }
    LIMIT 10
`;

export const FETCH_MENU_MAPS_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT (STRAFTER(STR(?map), "#") AS ?Map)
    WHERE {
        ?map rdf:type moba:Map .
    }
`;


export const FETCH_MAPS_PROPERTY_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT (STRAFTER(STR(?property), "#") AS ?Property) ?value
    WHERE {
        moba:SummonerRift ?property ?value .
        FILTER(isLITERAL(?value)) .
    }
`;

export const FETCH_MAPS_AREAS_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT DISTINCT (STRAFTER(STR(?mapArea), "#") AS ?MapArea) ?MapAreaDescription
    WHERE {
        moba:SummonerRift moba:hasMapArea ?mapArea .
        ?mapArea moba:laneDescription ?MapAreaDescription .
    }
`;

export const FETCH_CHAMPIONS_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT (STRAFTER(STR(?champion), "#") AS ?championName)
        (GROUP_CONCAT(DISTINCT STRAFTER(STR(?role), "#"); SEPARATOR=", ") AS ?roles)
        (GROUP_CONCAT(DISTINCT STRAFTER(STR(?ability), "#"); SEPARATOR=", ") AS ?abilities)
    WHERE {
        ?champion rdf:type moba:Champion .
        ?champion moba:isPlayableOf moba:LeagueOfLegends .
        OPTIONAL {
            ?champion moba:hasRole ?role .
        }
        OPTIONAL {
            ?champion moba:hasAbility ?ability .
        }
    }
    GROUP BY ?champion
`;

export const FETCH_CHAMPIONS_ROLE_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT (STRAFTER(STR(?role), "#") AS ?Role)
    WHERE {
        ?role rdf:type moba:Role .
    }
`;

export const FETCH_CHAMPIONS_DATA_QUERY = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
    PREFIX vgo: <http://purl.org/net/videogameontology#>
    PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

    SELECT (STRAFTER(STR(?champion), '#') AS ?championName) (STRAFTER(STR(?property), '#') AS ?propertyName) ?value
    WHERE {
        ?champion rdf:type moba:Champion .
        ?champion moba:isPlayableOf moba:LeagueOfLegends .
        ?champion ?property ?value .
        FILTER (isLiteral(?value))
    }
    ORDER BY ?championName ?propertyName
`;

export const FETCH_TEAMS_CHAMPIONSHIPS_QUERY = 
`
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
PREFIX vgo: <http://purl.org/net/videogameontology#>
PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT (STRAFTER(STR(?competition), "#") AS ?Championship) (COUNT(?team) AS ?teamCount)
WHERE {
  ?competition a sport:Competition ;
    moba:isOfficialCompetition true;
    moba:hasDiscipline moba:LeagueOfLegends;
    moba:hasCompetitor ?competitor .

  {
    SELECT ?competitor ?team
    WHERE {
      ?competitor moba:hasCompetitor ?team .
      ?team a moba:Team .
    }
  }
}
GROUP BY ?competition
`;

export const FETCH_WORLD_CHAMPIONSHIP = `
PREFIX : <http://www.semanticweb.org/MobaOntology#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
PREFIX vgo: <http://purl.org/net/videogameontology#>
PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT (STRAFTER(STR(?competition), "#") AS ?Championship)
    (STRAFTER(STR(?property), "#") AS ?Property)
    (GROUP_CONCAT(?value; SEPARATOR=", ") AS ?values)
WHERE {
  ?competition a sport:Competition ;
    moba:isOfficialCompetition true;
    moba:hasLocation moba:World ;
    moba:hasDiscipline moba:LeagueOfLegends .
  ?competition ?property ?value .
  ?property a rdf:Property .
  FILTER (isLiteral(?value))
}
GROUP BY ?competition ?property
`;


export const FETCH_REGIONAL_CHAMPIONSHIP = `
PREFIX : <http://www.semanticweb.org/MobaOntology#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
PREFIX vgo: <http://purl.org/net/videogameontology#>
PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT (STRAFTER(STR(?competition), "#") AS ?Championship)
    (STRAFTER(STR(?property), "#") AS ?Property)
    (GROUP_CONCAT(?value; SEPARATOR=", ") AS ?values)
WHERE {
  ?competition a sport:Competition ;
    moba:isOfficialCompetition true;
    moba:hasDiscipline moba:LeagueOfLegends .
  ?competition ?property ?value .
  ?property a rdf:Property .
  FILTER (isLiteral(?value))
  FILTER NOT EXISTS { ?competition moba:hasLocation moba:World }
}
GROUP BY ?competition ?property
`;