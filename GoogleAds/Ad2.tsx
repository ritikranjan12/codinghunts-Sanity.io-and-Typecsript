import {useEffect} from 'react';

export function Ad2() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <div style={{overflow: 'hidden'}}>
    <ins className="adsbygoogle"
     style={{display:'block'}}
     data-ad-client={process.env.NEXT_PUBLIC_GOOGLEID}
     data-ad-slot="6870560253"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
     </div>
  );
}








