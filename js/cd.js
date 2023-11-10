let showpanel;
let closepanel;


window.addEventListener('load',inicio);

	function inicio(){
		document.getElementById('btnstartpage').addEventListener('click',subir);

		document.getElementById('alerta').addEventListener('click',function(){
			closepanel();
		});	

        function subir(){
            window.scrollTo(0,0);
        }

        function hidealert(){
        let tiempo = setTimeout(closepanel,9000);
        };

        showpanel = function(param){
            document.getElementById('alerta').style.display = "block";
            document.getElementById('mensajealerta').innerHTML = param;
            hidealert();
        };


        closepanel = function(){

            document.getElementById('alerta').style.display = "none";
        };

    	closepanel();

	}; 
function formatMiles(nro)
{
	nro=String(nro);
	let num = nro.replace(/\./g,'');
	if(!isNaN(num))
	{
		num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
		num = num.split('').reverse().join('').replace(/^[\.]/,'');
		return num;
	}
	else { return false; }
}

function Calcular()
	{
		let arrMatriz = new Array(document.getElementById('idPlazo').value);
		let strCadena, monto, tasa, plazo, interes, cuota, abonoCapital, saldo, i, seguro, cuotaYseg;

		if ( document.getElementById('idMonto').value=='')
		{
			showpanel('Por favor, ingrese el monto del pr\u00E9stamo.');
			document.getElementById('idMonto').focus();
			return false;
		}
		else
		{

			if (document.getElementById('idMonto').value >= 1000000000000)
			{
				showpanel('El monto no debe ser mayor de 999999999999.99');
				document.getElementById('idMonto').focus();
				return false;
			}
			else
			{

				if (document.getElementById('idPlazo').value=='')
				{
					showpanel('Por favor, ingrese el plazo en meses.');
					document.getElementById('idPlazo').focus();
					return false;
				}
				else
				{

					if (document.getElementById('idPlazo').value > 180)
					{
						showpanel('El plazo en meses no debe ser mayor que 180.');
						document.getElementById('idPlazo').focus();
						return false;
					}
					else
					{

						if (document.getElementById('idTasa').value=='' )
						{
							showpanel('Por favor, ingrese la tasa de inter\u00E9s.');
							document.getElementById('idTasa').focus();
							return false;
						}
						else
						{
							if (document.getElementById('idTasa').value.indexOf(".") == -1) { document.getElementById('idTasa').value = document.getElementById('idTasa').value + ".00" ;}

							if ( !document.getElementById('idTasa').value.match("^[0-9]{0,1}(\.[0-9]{1,2})?$") )
							{
								showpanel('Por favor, para la tasa de inter\u00E9s ingrese un valor entre 0 y 9.99 El valor puede tener hasta 2 decimales. Ej. 5.35');
								document.getElementById('idTasa').focus();
								return false;
							}
							else
							{
								strCadena="<TABLE cellpadding='0' cellspacing='0' border='0' width='100%' class='tablemain' style='text-align:center;border:1px solid #CCC;'><TR class='encabezadoSimulador'> <TD>Per&iacute;odo</TD> <TD>Saldo Inicial</TD> <TD>Intereses</TD> <TD>Abono a Capital</TD> <TD>Cuota</TD> <TD>Saldo Final</TD></TR>";


								for(i=0;i<document.getElementById('idPlazo').value;i++)
								{
									arrMatriz[i]=new Array(6);
								}
								monto=document.getElementById('idMonto').value;
								tasa=document.getElementById('idTasa').value/100;
								plazo=document.getElementById('idPlazo').value;
								seguro=saldo;


								interes=tasa*monto;
								cuota=monto*(tasa*Math.pow((tasa+1),plazo))/(Math.pow((tasa+1),plazo)-1);
								abonoCapital=cuota-interes;
								saldo=monto-abonoCapital;
								cuotaYseg=cuota;
								seguro=(saldo);

								for(i=0;i<document.getElementById('idPlazo').value;i++)
								{
									arrMatriz[i][0] = i+1;
									arrMatriz[i][1] = Math.round(monto); 
									arrMatriz[i][2] = Math.round(interes); 
									arrMatriz[i][3] = Math.round(abonoCapital);
									arrMatriz[i][4] = Math.round(cuotaYseg); 
                                    					arrMatriz[i][5] = Math.round(seguro);  
									monto=saldo;
									interes=tasa*monto;
									abonoCapital=cuota-interes;
									saldo=monto-abonoCapital;
									seguro=(saldo); 
									cuotaYseg=cuota;

								}

								for(i=0;i<document.getElementById('idPlazo').value;i++)
								{
									arrMatriz[i][1]=formatMiles(arrMatriz[i][1]);
									arrMatriz[i][2]=formatMiles(arrMatriz[i][2]);
									arrMatriz[i][3]=formatMiles(arrMatriz[i][3]);
									arrMatriz[i][4]=formatMiles(arrMatriz[i][4]);
									arrMatriz[i][5]=formatMiles(arrMatriz[i][5]);
								}

								for(i=0;i<document.getElementById('idPlazo').value;i++)
								{
									strCadena=strCadena+"<TR><TD class='borTab'>"+arrMatriz[i][0]+"</TD><TD class='borTab'>"+'$ '+arrMatriz[i][1]+"</TD><TD class='borTab'>"+'$ '+arrMatriz[i][2]+"</TD><TD class='borTab'>"+'$ '+arrMatriz[i][3]+"</TD><TD class='borTab'>"+'$ '+arrMatriz[i][4]+"</TD><TD class='borTab'>"+'$ '+arrMatriz[i][5]+"</TD></TR>";
								}

								strCadena=strCadena+"</TABLE>";
								document.getElementById('idResultado').innerHTML=strCadena;
							}

						}

					}
				}

		     	}

		}
	}

	function redondeo2decimales(numero)
	{
		let original=parseFloat(numero);
		let result=Math.round(original*100)/100 ;
		return result;
	}

	function acceptNum(evt)
	{

		let nav4 = window.Event ? true : false;
		let key = nav4 ? evt.which : evt.keyCode;
		return ( (key >= 48 && key <= 57) || key == 46 || key == 8 || key == 127);
	}
