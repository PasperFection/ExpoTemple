    // Start of Selection
    // Uitleg: Deze testsuite controleert de PaymentContext functionaliteit.
    import React, { ReactNode } from 'react';
    import { renderHook, act } from '@testing-library/react-hooks';
    import { PaymentProvider, usePayment } from '../contexts/PaymentContext';
    import { initiatePayment, getPaymentHistory } from '../services/payment';
    
    jest.mock('../services/payment');
    
    // Beschrijving: Testsuite voor PaymentContext en initiëren van betaling
    describe('PaymentContext', () => {
      it('should initiate payment successfully', async () => {
        // Mock de payment services om gecontroleerde responses te geven
        (initiatePayment as jest.Mock).mockResolvedValue({});
        (getPaymentHistory as jest.Mock).mockResolvedValue([]);
    
        // Uitleg: Wrapper component om PaymentProvider te omringen tijdens tests
        const wrapper: React.FC = ({ children }: { children: ReactNode }) => (
      // Start of Selection
      // Uitleg: Gebruik de correcte PaymentProvider component
      <PaymentProvider>{children}</PaymentProvider>
      );

    // Uitleg: Render de usePayment hook met de juiste wrapper
    const { result, waitForNextUpdate } = renderHook(() => usePayment(), { wrapper });
    
        // Uitleg: Voer de initiatePayment functie uit met een bedrag van 100
        act(() => {
          result.current.initiatePayment(100);
        });
    
        // Uitleg: Wacht tot de state update is voltooid
        await waitForNextUpdate();
    
        // Uitleg: Controleer of de services zijn aangeroepen met de juiste parameters
        expect(initiatePayment).toHaveBeenCalledWith(100);
        expect(getPaymentHistory).toHaveBeenCalled();
      });
    }
    // Tips en lessen voor ontwikkelaars:
    // - Zorg ervoor dat de wrapper correct getypeerd is om 'children' te ondersteunen.
    // - Gebruik ReactNode voor de 'children' prop voor maximale flexibiliteit.
    // - Mock services zorgvuldig om consistente testresultaten te garanderen.
    // - Gebruik duidelijke en beschrijvende testnamen voor betere leesbaarheid.
    // - Test zowel succes als foutscenario's voor uitgebreide dekking.
    // - Houd tests geïsoleerd om onverwachte interacties te voorkomen.
    // - Documenteer testcases voor toekomstige referentie en teamcommunicatie.
    // - Blijf de nieuwste best practices voor testing volgen.
    // - Verifieer dat alle dependencies up-to-date en veilig zijn.
    // - Gebruik logging waar nodig om problemen makkelijker te debuggen.