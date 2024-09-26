import { ErrorInfo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

// Importeer de API_BASE_URL uit een lokaal configuratiebestand
import { API_BASE_URL } from '../../../shared/config/environment';

// Tip voor beginners: Het gebruik van een lokaal configuratiebestand in plaats van '@env'
// maakt het gemakkelijker om omgevingsvariabelen te beheren en te testen.
// Zorg ervoor dat je een 'config/environment.ts' bestand aanmaakt met de juiste exports.

// Voorbeeld van hoe 'config/environment.ts' eruit zou kunnen zien:
// export const API_BASE_URL = 'https://api.example.com';
// Je kunt hier ook andere configuratievariabelen toevoegen.

/**
 * logError: Een functie voor het loggen van fouten
 * 
 * @description
 * Deze functie is verantwoordelijk voor het verzamelen en loggen van foutinformatie.
 * Het maakt gebruik van React Native's Platform API, DeviceInfo voor apparaatspecifieke informatie,
 * en een geconfigureerde API_BASE_URL voor het verzenden van foutmeldingen.
 * 
 * @opmerking
 * - Zorg ervoor dat de 'react-native-device-info' bibliotheek correct is geïnstalleerd en gelinkt.
 * - De API_BASE_URL wordt nu geïmporteerd uit '@env', wat een veel gebruikte methode is voor
 *   het beheren van omgevingsvariabelen in React Native projecten.
 * 
 * @tip
 * Het is aan te raden om een robuust foutafhandelingssysteem te implementeren dat rekening houdt
 * met verschillende netwerkomstandigheden en foutscenario's.
 *
 * Deze functie verzamelt relevante informatie over de fout en de apparaatomgeving,
 * en stuurt deze naar een externe logging service. Als er geen internetverbinding is,
 * wordt de fout lokaal opgeslagen voor latere verzending.
 * 
 * @param error - Het Error object dat de fout beschrijft
 * @param errorInfo - Aanvullende informatie over de fout, zoals de component stack
 */
export const logError = async (error: Error, errorInfo: ErrorInfo): Promise<void> => {
  try {
    // Verzamel apparaat- en omgevingsinformatie
    const deviceInfo = {
      platform: Platform.OS,
      version: Platform.Version,
      deviceModel: await DeviceInfo.getModel(),
      appVersion: await DeviceInfo.getVersion(),
      buildNumber: await DeviceInfo.getBuildNumber(),
    };

    // Bereid de foutmelding voor
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      errorInfo: errorInfo,
      deviceInfo: deviceInfo,
    };

    // Probeer de fout naar de server te sturen
    const response = await fetch(`${API_BASE_URL}/log-error`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorLog),
    });

    if (!response.ok) {
      throw new Error('Fout bij het verzenden van de foutmelding naar de server');
    }
  } catch (sendError) {
    console.error('Kon de fout niet naar de server sturen:', sendError);
    
    // Als het verzenden mislukt, sla de fout lokaal op
    try {
      const storedErrors = await AsyncStorage.getItem('offlineErrors');
      const errors = storedErrors ? JSON.parse(storedErrors) : [];
      errors.push({
        timestamp: new Date().toISOString(),
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        errorInfo: errorInfo,
        deviceInfo: DeviceInfo,
      });
      await AsyncStorage.setItem('offlineErrors', JSON.stringify(errors));
    } catch (storageError) {
      console.error('Kon de fout niet lokaal opslaan:', storageError);
    }
  }
};

/**
 * sendStoredErrors: Een functie voor het verzenden van opgeslagen fouten
 * 
 * Deze functie controleert of er lokaal opgeslagen fouten zijn en probeert
 * deze naar de server te sturen wanneer er weer een internetverbinding is.
 */
export const sendStoredErrors = async (): Promise<void> => {
  try {
    const storedErrors = await AsyncStorage.getItem('offlineErrors');
    if (storedErrors) {
      const errors = JSON.parse(storedErrors);
      for (const errorLog of errors) {
        try {
          const response = await fetch(`${API_BASE_URL}/log-error`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(errorLog),
          });

          if (!response.ok) {
            throw new Error('Fout bij het verzenden van opgeslagen foutmelding');
          }
        } catch (sendError) {
          console.error('Kon opgeslagen fout niet verzenden:', sendError);
          // Als een fout niet kan worden verzonden, laat deze dan in de opslag staan
          return;
        }
      }
      // Als alle fouten succesvol zijn verzonden, verwijder ze uit de lokale opslag
      await AsyncStorage.removeItem('offlineErrors');
    }
  } catch (error) {
    console.error('Fout bij het verwerken van opgeslagen fouten:', error);
  }
};

// Uitleg:
// - We gebruiken AsyncStorage om fouten lokaal op te slaan als ze niet direct kunnen worden verzonden.
// - DeviceInfo wordt gebruikt om gedetailleerde apparaatinformatie te verzamelen.
// - We maken gebruik van een API_BASE_URL die je in een config bestand moet definiëren.
// - De sendStoredErrors functie kan worden aangeroepen wanneer de app opnieuw verbinding maakt met het internet.

// Tips:
// - Zorg ervoor dat je de juiste permissies hebt ingesteld voor het verzamelen van apparaatinformatie.
// - Overweeg om een queue-systeem te implementeren voor het verzenden van opgeslagen fouten om de server niet te overbelasten.
// - Je kunt de sendStoredErrors functie aanroepen in de GlobalProvider wanneer de isOffline status verandert naar false.
