from random import randint, choice

from django.forms.models import model_to_dict
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model 

from ...models import MonitoringRequest


def gen_mock_monreqs(how_many: int):
    super_user = get_user_model().objects.get(pk=1)
    monreqs = []
    for n in range(how_many):
        monreq = MonitoringRequest.objects.create(
            status = choice(MonitoringRequest.Status.values),
            shipping_company=f"Transportadora {n}",
            vehicle_type=choice(MonitoringRequest.VehicleType.values),
            origin= f"Origem {n}",
            destination = f"Destino {n}",
            cargo_description=f"Carga {n}",
            cargo_value= randint(10000,100000)
        )
        monreq.logins.add(super_user) 
        monreqs.append(monreq)
    return monreqs

class Command(BaseCommand):

    def handle(self, *args, **options) -> None:
        monreqs = gen_mock_monreqs(50)
        for mr_dict in (model_to_dict(mr) for mr in monreqs):
            print(mr_dict)
            self.stdout.write(
                "\n".join(
                    [f"{k.capitalize().replace('_',' ')}:{v}" for (k,v) in mr_dict.items()]
                )
            )

