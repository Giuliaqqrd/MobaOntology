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

export const FETCH_CHAMPION_WIKIDATA_QUERY = (championIds) => {
    const ids = championIds.map(id => `wd:${id}`).join(' ');
    
    return `
        SELECT ?championName ?sexLabel ?publicationDate ?description ?image WHERE {
            VALUES ?champion { ${ids} }
            ?champion wdt:P21 ?sex;        # Sesso
                    wdt:P577 ?publicationDate;  # Data di pubblicazione
                    rdfs:label ?championName;  # Nome del campione
                    schema:description ?description.
                    
            OPTIONAL { ?champion wdt:P18 ?image. } # Immagine (opzionale)
            
            FILTER(LANG(?description) = "en")
            FILTER (LANG(?championName) = "en")
        
            SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
    `;
};

export const FETCH_CHAMPIONS_DATA_QUERY_ONTOP = `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
PREFIX vgo: <http://purl.org/net/videogameontology#>
PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT (STRAFTER(STR(?champion), '#') AS ?championName)
       (STRAFTER(STR(?property), '#') AS ?propertyName)
       ?value
WHERE {
  ?champion rdf:type moba:Champion .
  #?champion moba:isPlayableOf moba:LeagueOfLegends .
  ?champion ?property ?value .
  FILTER (isLiteral(?value))
  
  # Sottoquery per filtrare i campioni giocabili da "League of Legends"
  {
    SELECT ?champion
    WHERE {
      ?champion rdf:type moba:Champion .
      ?champion moba:isPlayableOf ?game .
      ?game rdf:type vgo:Game .
      ?game moba:gameName "League of Legends" .
    }
  }
}
ORDER BY ?championName ?propertyName
`;


export const FETCH_CHAMPIONS_QUERY_ONTOP = `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
PREFIX vgo: <http://purl.org/net/videogameontology#>
PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT
  (STRAFTER(STR(?champion), "#") AS ?championName)
  (GROUP_CONCAT(DISTINCT STRAFTER(STR(?role), "#"); SEPARATOR=", ") AS ?roles)
  (GROUP_CONCAT(DISTINCT ?abilityName; SEPARATOR=", ") AS ?abilityNames)
WHERE {
  ?champion rdf:type moba:Champion .
  #?champion moba:isPlayableOf moba:LeagueOfLegends .
  
  OPTIONAL {
    ?champion moba:hasRole ?role .
  }
  
  OPTIONAL {
    ?champion moba:hasAbility ?ability .
    ?ability moba:abilityName ?abilityName .
  }
}
GROUP BY ?champion
`;


export const FETCH_GAME_DESCRIPTION_QUERY = `
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX moba: <http://www.semanticweb.org/MobaOntology#>
PREFIX vgo: <http://purl.org/net/videogameontology#>
PREFIX sport: <https://www.bbc.co.uk/ontologies/sport/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?gameName ?gameDescription
WHERE {
  ?game rdf:type vgo:Game ;
        moba:gameName ?gameName ;
        moba:gameDescription ?gameDescription.
}
`;

export const FETCH_GAME_INFORMATION_WIKIDATA_QUERY = (championIds) => {
    const ids = championIds.map(id => `wd:${id}`).join(' ');

    return `
    SELECT ?gameName ?gameImage (GROUP_CONCAT(DISTINCT ?developerName; SEPARATOR=", ") AS ?developers)
       (GROUP_CONCAT(DISTINCT ?developerLogo; SEPARATOR=", ") AS ?developerLogos)
       ?businessModelType ?site (GROUP_CONCAT(DISTINCT ?releaseDate; SEPARATOR=", ") AS ?releaseDates)
       (GROUP_CONCAT(DISTINCT ?awardsTitle; SEPARATOR=", ") AS ?awardsTitles)
    WHERE {
        VALUES ?game { ${ids} }
        ?game rdfs:label ?gameName;
          wdt:P577 ?releaseDate.
        FILTER((LANG(?gameName)) = "en")

        OPTIONAL {
          ?game wdt:P178 ?developer.
          ?developer rdfs:label ?developerName;
            wdt:P154 ?developerLogo.
          FILTER((LANG(?developerName)) = "en")
        }
        OPTIONAL {
          ?game wdt:P7936 ?businessModel.
          ?businessModel rdfs:label ?businessModelType.
          FILTER((LANG(?businessModelType)) = "en")
        }
        OPTIONAL { ?game wdt:P856 ?site. }
        OPTIONAL {
          ?game wdt:P166 ?awards.
          ?awards rdfs:label ?awardsTitle.
          FILTER((LANG(?awardsTitle)) = "en")
        }
        OPTIONAL { ?game wdt:P154 ?gameImage. }
        
        SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
      }
      GROUP BY ?gameName ?gameImage ?businessModelType ?site
    `
      
}